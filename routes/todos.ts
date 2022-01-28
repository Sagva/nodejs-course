import {Router} from 'express'
import {Todo} from '../models/todo' //named import, importing interface Todo { id: string; test: string;}
const todos: Todo[] = [] //array full of Todos

const router = Router()

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})
router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toLocaleDateString(),
        text: req.body.text
    }
    todos.push(newTodo)
    
})

export default router //instead module.exports = router