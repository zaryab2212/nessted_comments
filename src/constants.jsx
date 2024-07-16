export const commentsArr = [
  {
    id: 1,
    comment: "This is First Comment",
    Votes: 29,
    date: Date.now(),
    isVisible: false,
    replies: [
      {
        id: 2,
        comment: "This is nested Comment",
        Votes: 9,
        date: Date.now(),
        isVisible: false,

        replies: [
          {
            id: 3,
            comment: "This is Second_nested Comment",
            Votes: 29,
            date: Date.now(),
            isVisible: false,

            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    comment: "This is Second Comment",
    Votes: 9122,
    date: Date.now(),
    isVisible: false,

    replies: [
      {
        id: 5,
        comment: "This is nested Comment",
        Votes: 9,
        date: Date.now(),
        isVisible: false,

        replies: [],
      },
    ],
  },
  {
    id: 6,
    comment: "This is 3rd Comment",
    Votes: 19,
    date: Date.now(),
    isVisible: false,

    replies: [],
  },
];
