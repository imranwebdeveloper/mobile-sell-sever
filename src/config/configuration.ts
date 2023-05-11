export const configuration = {
  jwt: process.env.SECRETE,
};
export const config = () => ({
  port: parseInt(process.env.PORT) || 3001,
  database: {
    host: process.env.DB,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  JWT_SECRETE: process.env.SECRETE,
  firebase: {
    type: 'service_account',
    project_id: 'mobile-seller-e6165',
    private_key_id: '36f1ffaa81f28db22a355fc06f5f7ba66a268699',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCp0PVl2Lst53lh\ns7FvaAC3v51YU1lgjXAQWkuPzKBZL+b2L0Ns8suWg0EJ5EGbUQvQA2L4ThAgfEEr\nh3CotnD39hPQ0lRyTupoO4x5ytrxkvQNxM0K6mu+xgh0C24nmIwlJ/FW47qnWFI+\nINHssCwGAoRlzHbahv/SN7o8rmxAYQgfhxltoCfQ/UIcaVG7q9KIlzhodbHMZjvO\n4oKFi2NV4RFbudNyZ3TrlMdrCVTCCZUh5/DzucxF7YG7A4PxXwyMnH99HPn2DotQ\njnbo8euRYeGvUzdkAa2nAMXwDBIumMlCSIgr2ODyl7+1gGHrLz/N+UppuR/QinbH\nIhZ0D989AgMBAAECggEAAZOoUzlMYE4aHh/DxHtbi3WuYZZvbWGAKKHS5Ni7Qd73\n20q6cehWdDboSNUW8PkBfAurj2Se1Ywp0DG9yGrQJVTUMXDiFOgxEbsWQ7/MiJaJ\nQcLqr3t0zmIJE3KMDm+tNMpWkpcp5v7xT3E0oOi+awOIzZJmpZDcnRMA5Ligq6Mg\nADMBeqpOxFce4krW2h5iDAeAXYrGoLOg56J1PyF9MLhHb38kmiOfPZxX5klvPlJ1\n74rvI8ZQE/uOU7Jkmv6rf9h2KtiPt633P7kxepjMLFm6DGLw/Jx1AWkm8MY+zgKW\nGFMSViEMpMVP1pBPa5fzYzna4aivJTBmN1+Ev8zt+QKBgQDrwuwa9IJiyftedF1l\nIWzFE5SeDTl738zYj+84f4HVvnwqdRMYvOVnsY3rBf3B8ArJvT7QfJkKMxZOUYaU\nUDz6IyuQHygl+G+UJvzWFAVaSiShs+CB7D7cjl/JYANPWt6B6fsvfeRAK22w2TRN\nk7jGkhY75S6JUTz30J9pLQvvyQKBgQC4ZNRXwx5P9KBP8y+ESiuJqriPPJIcgWQv\nMSYUJmC76F2yU95S3hSGW1qzsmSYN2B787PQCbL2Uyw8hpklmEC/3muc0WWykr9m\ncrYDsCZJZTJmvjUSsrdH1RnDWFHzZAvBHPA/k2sirraIlcUFq3S0i/ABjWgXkren\nd9Hd1nb11QKBgBODHmdctS3X6aX3m4MzMP1ekX5DOe62pw2FXBcg9m3qRfx9lAcI\nGzRpzYUWCdpzM3Fe6EP5C/F8KOxycuDzgxhwsLpM2dXKqfFpCKPvJEJEwKNhb8NQ\n+iLm5aaU+7ElpCS8aL2Vfb6R2ZI5Z8rD3xcQICb04NUclB8udQMPZ12BAoGBAKH9\nQmZPLYQEXgmelHHdTt5EMprzFVEhgsfKn683/+dUPWv6LegS3WkjPE19PM5UZ9i8\nwYzT2Hp5mvUZMdVLKibk2RkNBBCaxrbTs38N8rSryFlmY+2nP0hFt7pbDrOJgqIG\nMDFJ6uavIgBfwpQ2ifJKtXBHr9h1tg3TP3VpgVx5AoGAa0LWwaxWwzTS92M25AUL\nKrUSaKWAO90hz08dI6tm/659s6uIo9SOeH/meuqstpCoj5hVBYqZWAoJRxFfXfKQ\nTN65u5tBFoYqx6dJduFcQO7DEep0eTLrnaObn5+SzW8t57krklE2MuwpxDhn0P4x\nzF/f1/ofDrN6PzQel8wrEF4=\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-bzu38@mobile-seller-e6165.iam.gserviceaccount.com',
    client_id: '105406169136264571934',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bzu38%40mobile-seller-e6165.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  },
  storageBucket: 'mobile-seller-e6165.appspot.com',
});
