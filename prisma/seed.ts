import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const provider = await prisma.aiProvider.upsert({
    where: { name: 'deepseek' },
    update: {},
    create: {
      name: 'deepseek',
      apiBase: 'https://api.deepseek.com',
      modelCatalog: {},
    },
  });

  const apiKey = await prisma.aiApiKey.upsert({
    where: {
      providerId_keyAlias: {
        providerId: provider.id,
        keyAlias: 'ds-key-001',
      },
    },
    update: {},
    create: {
      providerId: provider.id,
      keyAlias: 'ds-key-001',
      encryptedKey: 'sk-9a08762dca084487922a5d5037ab9f1b',
    },
  });

  const prompt = await prisma.prompt.upsert({
    where: {
      providerId_name: {
        providerId: provider.id,
        name: 'ds-prompt-v1',
      },
    },
    update: {},
    create: {
      providerId: provider.id,
      name: 'ds-prompt-v1',
      content: [
        'You are an autonomous crypto trading strategist operating on Hyperliquid.',
        'Use the provided market snapshots, balance state, and prior decisions to produce actionable plans.',
      ].join('\n'),
    },
  });

  await prisma.aiAgent.upsert({
    where: {
      apiKeyId_promptId: {
        apiKeyId: apiKey.id,
        promptId: prompt.id,
      },
    },
    update: {},
    create: {
      providerId: provider.id,
      apiKeyId: apiKey.id,
      promptId: prompt.id,
      agentName: 'DeepSeek-A1',
      modelName: 'deepseek-trader',
    },
  });
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
