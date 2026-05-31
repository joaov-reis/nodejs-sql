const express = require('express')
const mariadb = require('mariadb')

const app = express()

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'infdb',
    connectionLimit:100
})

app.get('/users',async(req,res)=>{
    let conn;
    try{
        conn = await pool.getConnection()
        const result = await conn.query('SELECT name,email FROM users')
        res.json(result)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send('Server Error')
    }
    finally
    {
        if(conn) conn.release()
    }

})

app.get('/users/:id', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();

        const user = await conn.query(
            `SELECT * FROM users WHERE id = ?`,
            [req.params.id]
        );

        res.json(user);
    } 
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    } 
    finally {
        if (conn) conn.release();
    }
});


app.listen(3333,()=>{
    console.log('API rodando em http://localhost:3333')
})