export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'reference',  // Assuming `postedBy` is a reference to the `user` document
        to: [{type: 'user'}],
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'string',
      },
    ],
  };
  