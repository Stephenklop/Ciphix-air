// Intent name: Default Welcome Intent
export const welcome = (conv: any) => {

    console.log(conv);

    return conv.add(
        `Welkom bij de Ciphix Conversational Automation Case!`
    )
}