// src/Components/PackageCard.tsx
import * as React from 'react';
import UnifiedCard from './UnifiedCard';

interface PackageCardProps {
  title: string;
  subtitle: string;
  body: string;
  icon: React.ReactNode;
}

// PackageCard: wrapper for UnifiedCard with 'package' variant
const PackageCard: React.FC<PackageCardProps> = ({
  title,
  subtitle,
  body,
  icon,
}) => {
  return (
    <UnifiedCard
      variant="package"
      title={title}
      subtitle={subtitle}
      body={body}
      icon={icon}
    />
  );
};

export default PackageCard;
