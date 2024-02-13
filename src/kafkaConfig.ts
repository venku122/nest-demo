import { KafkaOptions, Transport } from '@nestjs/microservices';
import { PartitionAssigners } from 'kafkajs';

const config: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'nest-demo',
      brokers: ['localhost:9093', 'localhost:9092'],
    },
    subscribe: { fromBeginning: true },
    consumer: {
      groupId: 'nest-demo-consumer',
      allowAutoTopicCreation: true,
      partitionAssigners: [PartitionAssigners.roundRobin],
      retry: {
        retries: 5,
        multiplier: 1.5,
        maxRetryTime: 60000,
        restartOnFailure: async (err: Error) => {
          console.log('consumer restart error', err);
          return true;
        },
      },
    },
  },
};

export default config;
