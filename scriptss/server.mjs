import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
app.use(express.json())


//agora vou tentar criar uma rota se search
app.get('/usuarios',async(req,res)=>{
    let users=[]
    if (req.query) {
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.body.email,
                servico: req.body.servico
            }
        })
    }
    else{
        users = await prisma.user.findMany()
    }
    res.status('200').json(users)

 })
 
app.post('/usuarios', async(req,res) => {
    await prisma.user.create({
            data: {
            name: req.body.name,
            email: req.body.email,
            servico: req.body.servico

        }
    })
    // users.push(req.body)
    
    res.status('201').json(req.body)
})
app.put('/usuarios/:id', async(req,res) => {

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            name: req.body.name,
            email: req.body.email,
            servico: req.body.servico
        }
        
    })
    res.status('201').json(req.body)
})

app.delete('/usuarios/:id', async(req,res) => {

    await prisma.user.delete({
        where:{
            id: req.params.id,
        }

    })
    res.status(200).json({message: " usuáro deletado com sucesso"})
})




app.listen(3000)

/*
 criar uma api de usuários

  - criar um  unuário 
  -listar todos os usuários
  -editar um usuário
  - deletar um usuário
 */

  //route params
  //editar algo em espscíficp
  /* 
  user: Helius
  senha :juliana034 
  */