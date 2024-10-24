import ky from "ky"

const kyInstance = ky.create({
    prefixUrl:process.env.NEXT_PUBLIC_BASE_URL, // Utilisation côté serveur, // Pas de préfixe côté client, utilise directement des URLs relatives
    
    parseJson: (text) =>
        JSON.parse(text, (key, value) => {
            if(key.endsWith("At")) return new Date(value)
            return value;
        }),
});

export default kyInstance;