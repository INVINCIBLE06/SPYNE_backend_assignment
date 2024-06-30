import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

// Signup function
export const signup = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const user = await User.create({ name, mobile, email, password });
    return res.status(201).json({ 
      code: 201,
      message: 'User created successfully', 
      data: user 
    });
  } catch (error) {
    console.log(`Error creating user`, error.message)
    return res.status(400).json({ 
      code: 400,
      message: 'Error creating user', 
      data: error 
    });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        code: 404,
        message: 'User not found', 
      });
    }

    const isMatch = await user.matchPassword(password);
      
    if (!isMatch) {
      return res.status(401).json({ 
        code: 401,
        message: 'Invalid password' 
      });
    }    

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return res.status(200).json({ 
      code: 200,
      message: 'Login successful', 
      token 
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ 
      code: 400,
      message: 'Error logging in', 
      error 
    });
  }
};
