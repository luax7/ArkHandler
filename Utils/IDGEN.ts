export default (len : number) => {

    const arr : string[] = [];
    const poss = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';


    for (let i = 0; i < len+1; i++) {
        
        arr.push(poss.charAt(

            Math.round(Math.random() * poss.length)

        ));

    }

    return arr.join('');
}