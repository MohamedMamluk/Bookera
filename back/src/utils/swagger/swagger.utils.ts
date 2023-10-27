import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const serverUrl =
    process.env.NODE_ENV == 'production'
      ? 'https://bookera.onrender.com/'
      : 'http://localhost:3000/';

  const options = new DocumentBuilder()
    .setTitle('EduHub API')
    .setDescription('API Specifications')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', in: 'header', scheme: 'bearer', bearerFormat: 'JWT' },
      'access_token',
    )
    .addServer(serverUrl, process.env.NODE_ENV)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api', app, document);
};
