import prisma from '../db';

import {
  createJWT,
  hashPassword,
  comparePasswords,
  generateRegistrationToken,
} from '../modules/auth';
import { sendRegistrationTokenEmail } from '../modules/email';


export const registerUser = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const email = req.body.email;
    const token = generateRegistrationToken();
    await prisma.registration.create({
      data: {
        email,
        token,
        firstName,
      }
    });

    sendRegistrationTokenEmail(email, firstName, token)
      .then(() => {
        res.json({ message: 'Verification email sent.' })
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Registration email failed.'});
      });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.' });
  }
};

export const userVerifyToken = async (req, res) => {
  try {
    const email = req.body.email;
    const token = parseInt(req.body.token);

    const registration = await prisma.registration.updateMany({
      where: { email, token },
      data: {
        verified: true,
      },
    });

    console.log({ registration });

    if (registration) {
      res.json({ message: 'Verified.' });
    } else {
      res.status(404).json({ message: 'Registration not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Verification failed.' });
  }
};

export const userRegistrationReset = async (req, res) => {
  try {
    const email = req.body.email;
    const token = generateRegistrationToken();
    const registration = await prisma.registration.update({
      data: { token },
      where: { email },
    });

    if (registration) {
      res.json({ message: 'Registration reset.' });
    } else {
      res.status(404).json({ message: 'Registration not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Registration reset failed.' });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const email = req.body.email;
    const registration = await prisma.registration.findFirstOrThrow({
      where: { email, verified: true },
    });

    const user = await prisma.user.create({
      data: {
        password: await hashPassword(req.body.password),
        firstName: registration.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        zipCode: req.body.zipCode,
        email,
      }
    });
  
    // send a welcome email for the newly created account
    // email should share some insight about why moment
    // exists.

    const token = createJWT(user);
    res.json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Account creation failed.' });
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    }
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'Unauthorized'});
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
