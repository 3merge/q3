export default (args) => {
  const isTemplate = (templateName) =>
    args.url.includes(`template=string(${templateName})`);

  const sendData = (data) => [
    200,
    {
      data,
    },
  ];

  if (isTemplate('appearances'))
    return sendData([
      {
        'id': 1,
        'episode': 11,
        'numberOfTimes': 63,
        'numberOfLines': 43,
        'compensation': 73,
        'quote': 'Iliac artery aneurysm',
        'date': '2022-04-14T18:53:01Z',
      },
      {
        'episode': 49,
        'numberOfTimes': 67,
        'numberOfLines': 26,
        'compensation': 86,
        'quote': 'Opn skl/oth fx-prol coma',
        'date': '2022-02-11T22:39:15Z',
        'id': 2,
      },
      {
        'episode': 50,
        'numberOfTimes': 71,
        'numberOfLines': 91,
        'compensation': 69,
        'quote': 'Tubal endometriosis',
        'date': '2021-12-24T10:56:10Z',
        'id': 3,
      },
      {
        'episode': 53,
        'numberOfTimes': 99,
        'numberOfLines': 60,
        'compensation': 48,
        'quote': 'Siderosis',
        'date': '2022-03-29T23:07:04Z',
        'id': 4,
      },
      {
        'episode': 71,
        'numberOfTimes': 28,
        'numberOfLines': 21,
        'compensation': 3,
        'quote': 'Open wound of breast',
        'date': '2022-09-14T04:53:13Z',
        'id': 5,
      },
      {
        'episode': 41,
        'numberOfTimes': 3,
        'numberOfLines': 8,
        'compensation': 92,
        'quote': 'Merkel cell ca-sclp/neck',
        'date': '2022-03-25T07:18:22Z',
        'id': 6,
      },
      {
        'episode': 27,
        'numberOfTimes': 5,
        'numberOfLines': 4,
        'compensation': 35,
        'quote': 'Inj post tibial vein',
        'date': '2022-06-12T13:39:06Z',
        'id': 7,
      },
      {
        'episode': 6,
        'numberOfTimes': 18,
        'numberOfLines': 44,
        'compensation': 41,
        'quote': 'Disloc 4th cerv vert-cl',
        'date': '2022-01-28T04:37:48Z',
        'id': 8,
      },
      {
        'episode': 29,
        'numberOfTimes': 24,
        'numberOfLines': 40,
        'compensation': 10,
        'quote': 'War inj:WMD NOS',
        'date': '2022-05-29T04:50:39Z',
        'id': 9,
      },
      {
        'episode': 47,
        'numberOfTimes': 78,
        'numberOfLines': 8,
        'compensation': 35,
        'quote': 'Schmorls node-lumbar',
        'date': '2021-11-08T22:57:17Z',
        'id': 10,
      },
      {
        'episode': 41,
        'numberOfTimes': 9,
        'numberOfLines': 95,
        'compensation': 67,
        'quote': 'Orbital myositis',
        'date': '2022-05-26T20:06:56Z',
        'id': 11,
      },
      {
        'episode': 9,
        'numberOfTimes': 45,
        'numberOfLines': 10,
        'compensation': 66,
        'quote': 'Trans hyperten-delivered',
        'date': '2022-05-28T01:31:00Z',
        'id': 12,
      },
      {
        'episode': 57,
        'numberOfTimes': 95,
        'numberOfLines': 99,
        'compensation': 10,
        'quote': 'Glaucomatous flecks',
        'date': '2022-07-08T04:20:11Z',
        'id': 13,
      },
      {
        'episode': 33,
        'numberOfTimes': 39,
        'numberOfLines': 57,
        'compensation': 33,
        'quote': 'Dacryoadenitis NOS',
        'date': '2022-07-05T21:07:36Z',
        'id': 14,
      },
      {
        'episode': 54,
        'numberOfTimes': 62,
        'numberOfLines': 35,
        'compensation': 36,
        'quote': 'Pseudomemb conjunctivit',
        'date': '2022-03-21T08:07:03Z',
        'id': 15,
      },
      {
        'episode': 84,
        'numberOfTimes': 77,
        'numberOfLines': 33,
        'compensation': 58,
        'quote': 'NB cardiac arrest',
        'date': '2022-06-11T04:57:14Z',
        'id': 16,
      },
      {
        'episode': 77,
        'numberOfTimes': 33,
        'numberOfLines': 45,
        'compensation': 28,
        'quote': 'Lumbar spinal cord injur',
        'date': '2022-05-11T23:37:06Z',
        'id': 17,
      },
      {
        'episode': 66,
        'numberOfTimes': 65,
        'numberOfLines': 94,
        'compensation': 62,
        'quote': 'NB obsrv suspct infect',
        'date': '2022-08-05T20:10:09Z',
        'id': 18,
      },
      {
        'id': 19,
        'episode': 42,
        'numberOfTimes': 98,
        'numberOfLines': 65,
        'compensation': 35,
        'quote': 'Tear med menisc knee-cur',
        'date': '2022-07-20T11:11:14Z',
      },
      {
        'id': 20,
        'episode': 82,
        'numberOfTimes': 9,
        'numberOfLines': 89,
        'compensation': 32,
        'quote': 'Bipol I cur depress-mild',
        'date': '2022-08-31T17:29:30Z',
      },
      {
        'id': 21,
        'episode': 45,
        'numberOfTimes': 56,
        'numberOfLines': 15,
        'compensation': 73,
        'quote': 'FB in posterior wall',
        'date': '2022-02-02T23:37:22Z',
      },
      {
        'id': 22,
        'episode': 34,
        'numberOfTimes': 39,
        'numberOfLines': 4,
        'compensation': 73,
        'quote': 'Contusion scapul region',
        'date': '2022-05-07T23:45:57Z',
      },
      {
        'id': 23,
        'episode': 87,
        'numberOfTimes': 17,
        'numberOfLines': 57,
        'compensation': 88,
        'quote': 'Myoneural disorders NEC',
        'date': '2022-04-30T01:42:01Z',
      },
      {
        'id': 24,
        'episode': 35,
        'numberOfTimes': 21,
        'numberOfLines': 8,
        'compensation': 90,
        'quote': 'Spec anomaly of orbit',
        'date': '2022-08-26T17:35:26Z',
      },
      {
        'id': 25,
        'episode': 51,
        'numberOfTimes': 27,
        'numberOfLines': 99,
        'compensation': 17,
        'quote': 'Disloc acromioclavic-opn',
        'date': '2022-09-13T12:51:01Z',
      },
    ]);

  if (isTemplate('stat'))
    return sendData([
      {
        unit: 'percent',
        value: 983,
        label: 'Profitability',
        deviation: -21,
      },
      {
        unit: 'dollar',
        value: 56000,
        label: 'Revenue',
        deviation: 765,
      },
      {
        unit: 'customers',
        value: 67,
        label: 'Acquisition',
        deviation: 12,
      },
    ]);

  return sendData({
    data: [
      {
        Shows: 'Rick and Morty',
        Streams: 1000000,
      },
      {
        Shows: "Bob's Burgers",
        Streams: 345000,
      },
      {
        Shows: 'Simpsons',
        Streams: 9972346,
      },
    ],
    name: 'Shows',
    value: 'Streams',
  });
};
