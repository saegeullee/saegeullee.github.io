db.posts.insertOne({
  title: 'my first blog post',
  text: 'excited to write this blog',
  tags: ['tech', 'js'],
  creator: ObjectId('5df26261c610a199922072f9'),
  comments: [{ text: 'very nice blog post', author: 123123 }]
});
