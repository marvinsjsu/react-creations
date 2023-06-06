import prisma from "../db";

export const quoteGetHandler = async (req, res) => {
  const quotes = await prisma.dailyQuote.findMany({
    orderBy: [ { createdAt: 'desc' } ]
  });
  res.json({ data: quotes });
};

export const quoteGetWithIdHandler = async (req, res) => {
  try {
    const quoteId = req.param.id;
    const quote = await prisma.dailyQuote.findFirst({
      where: { id: quoteId },
    });
  
    res.json({ data: quote });
  } catch(error) {
    res.status(404).json({ message: 'Not found' });
  }
};

export const quotePostHandler = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.user.id;
    const quote = await prisma.dailyQuote.create({
      data: {
        content: req.body.content,
        createdById: userId,
        by: req.body.by,
      }
    });

    res.json({ data: quote });
  } catch (error) {
    res.status(500).json({ message: 'Failed creating a quote.' });
  }
};

export const quotePutHandler = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const content = req.body.content;
    const by = req.body.by;
    const quote = await prisma.dailyQuote.update({
      data: { content, by },
      where: { id: quoteId },
    });

    if (quote) {
      res.json({ data: quote });
    } else {
      res.status(404).json({ message: 'quote not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'quote update failed.'});
  }
};

export const quoteDeleteHandler = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await prisma.dailyQuote.delete({
      where: {
        id: quoteId,
      }
    });

    if (quote) {
      res.json({ data: quote });
    } else {
      res.status(404).json({ message: 'quote not found.'});
    }
  } catch (error) {
    res.status(500).json({ message: 'quote deletion failed.' });
  }
};
