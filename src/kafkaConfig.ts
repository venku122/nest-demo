import { KafkaOptions, Transport } from '@nestjs/microservices';
import { PartitionAssigners } from 'kafkajs';

const config: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: process.env.KAFKA_BROKERS?.split(',') ?? [],
    },
    subscribe: { fromBeginning: true },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID ?? 'default-consumer-id',
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
