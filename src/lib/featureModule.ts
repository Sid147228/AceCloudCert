import type { FeatureModule } from '@/types';

export function defineFeature(feature: FeatureModule): FeatureModule {
  return feature;
}

export function getAvailableFeatures(features: readonly FeatureModule[]): FeatureModule[] {
  return features.filter((feature) => feature.status !== 'planned');
}
