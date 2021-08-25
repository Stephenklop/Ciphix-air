// Intent name: Default Fallback Intent
export const fallback = (conv: any) => {
    
    return conv.add(
        `I'm sorry. I didn't understand that.`
    )
}