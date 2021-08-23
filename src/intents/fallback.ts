// Intent name: Default Fallback Intent
export const fallback = (conv: any) => {
    
    return conv.add(
        `Ik heb je helaas niet begrepen.`
    )
}