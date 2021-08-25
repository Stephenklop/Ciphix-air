// Intent name: Default Welcome Intent
export const welcome = (conv: any) => {

    console.log(conv);

    return conv.add(
        `Welcome! How can I help you?`
    )
}