import { signMessage } from '@wagmi/core';
import { SiweMessage } from 'siwe';
import { apiClient } from './apiClient';
import { SiweNonceResponse, SiweVerifyResponse } from './types';

export async function fetchSiweNonce() {
  return apiClient<SiweNonceResponse>('/auth/siwe/nonce');
}

export async function verifySiweSignature(message: SiweMessage, signature: string) {
  return apiClient<SiweVerifyResponse>('/auth/siwe/verify', {
    method: 'POST',
    body: JSON.stringify({
      message: message.prepareMessage(),
      signature,
    }),
  });
}

export async function siweSignIn(address: string, chainId: number) {
  const { nonce } = await fetchSiweNonce();
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to Vibe Trading',
    uri: window.location.origin,
    version: '1',
    chainId,
    nonce,
  });

  const signature = await signMessage({
    message: message.prepareMessage(),
  });

  return verifySiweSignature(message, signature);
}
