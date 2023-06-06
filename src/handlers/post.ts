import prisma from "../db";

export const postGetHandler = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: [ { createdAt: 'desc' } ]
  });
  res.json({ data: posts });
};

export const postGetWithIdHandler = async (req, res) => {
  try {
    const postId = req.param.id;
    const post = await prisma.post.findFirst({
      where: { id: postId },
    });
  
    res.json({ data: post });
  } catch(error) {
    res.status(404).json({ message: 'Not found' });
  }
};

export const postPostHandler = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.user.id;
    const post = await prisma.post.create({
      data: {
        summary: req.body.summary,
        content: req.body.content,
        title: req.body.title,
        belongsToId: userId,
      }
    });

    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ message: 'Failed creating a post.' });
  }
};

export const postPutHandler = async (req, res) => {
  try {
    const postId = req.params.id;
    const content = req.body.content;
    const post = await prisma.post.update({
      data: { content },
      where: { id: postId },
    });

    if (post) {
      res.json({ data: post });
    } else {
      res.status(404).json({ message: 'Post not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Post update failed.'});
  }
};

export const postDeleteHandler = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.delete({
      where: {
        id: postId,
      }
    });

    if (post) {
      res.json({ data: post });
    } else {
      res.status(404).json({ message: 'Post not found.'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Post deletion failed.' });
  }
};
