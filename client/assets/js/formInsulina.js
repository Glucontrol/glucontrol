const guardar = async(req,res) =>{
    const response = await fetch("/insulina")
    console.log(response)
}