import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('select * from employees');
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error inesperado',
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('select * from employees where  id = ?', [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error inesperado',
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('Delete from employees where id = ?', [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error inesperado',
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      'insert into employees (name, salary) values (?, ?)',
      [name, salary]
    );

    res.status(201).json({ id: rows.insertId, name, salary });
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error inesperado',
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      'update employees set name = ifnull(?, name), salary = ifnull(?, salary) where id = ?',
      [name, salary, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: 'Empleado no encontrado',
      });
    }

    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error inesperado',
    });
  }
};
