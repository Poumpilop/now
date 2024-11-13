// src/app/api/reports/route.ts
import { NextResponse } from 'next/server';
import { reportsApi} from '@/lib/api/reportsApi'; // Vous devrez créer ces fonctions
import { ReportData } from './types';
import prisma from '@/lib/prisma';
import { validateRequest } from '@/auth';

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        status: true,
        reason: true,
        createdAt: true,
        reporter: {
          select: {
            username: true,
          },
        },
        reported: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error in GET reports:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Valider l'utilisateur authentifié
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Récupérer les données du signalement depuis le body de la requête
    const data: ReportData = await request.json();

    // Créer un nouveau signalement dans la base de données
    const report = await prisma.report.create({
      data: {
        reason: data.reason,
        description: data.description,
        reporterId: loggedInUser.id,
        reportedId: data.reportedId,
        status: "PENDING"
      }
    });

    // Retourner la réponse avec le signalement créé
    return NextResponse.json(report);
  } catch (error) {
    console.error("Erreur lors de la création du signalement :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { reportId, status } = await request.json();
    const updatedReport = await reportsApi.updateStatus(reportId, status);
    return NextResponse.json(updatedReport);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}