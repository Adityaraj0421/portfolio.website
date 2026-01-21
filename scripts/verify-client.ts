import { client } from '../src/lib/sanity/client';

console.log('Sanity Client Config:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
});

if (!client.config().projectId) {
    console.error('FAIL: projectId is missing');
    process.exit(1);
} else {
    console.log('SUCCESS: Sanity Client initialized with projectId:', client.config().projectId);
}
