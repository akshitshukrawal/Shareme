export default {
    name: 'pin',
    title: 'Pin',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'about',
        title: 'About',
        type: 'string',
      },
      {
        name: 'destination',
        title: 'Destination',
        type: 'url',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'Posted By',
        type: 'reference', 
        to: [{ type: 'user' }],
      },
      {
        name: 'save',
        title: 'Save',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'save' }] }],
      },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'comment' }] }],
      },
    ],
  };
  