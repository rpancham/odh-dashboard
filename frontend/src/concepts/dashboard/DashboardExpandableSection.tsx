import React from 'react';
import { ExpandableSection } from '@patternfly/react-core';
import { useBrowserStorage } from '~/components/browserStorage';

import './DashboardExpandableSection.scss';

type DashboardExpandableSectionProps = {
  children: React.ReactNode;
  title: string;
  storageKey: string;
};

const DashboardExpandableSection: React.FC<DashboardExpandableSectionProps> = ({
  children,
  title,
  storageKey,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useBrowserStorage(storageKey, true, true, true);

  return (
    <ExpandableSection
      className="odh-dashboard-expandable-section-heading"
      toggleText={title}
      onToggle={(e, isExpanded) => setIsExpanded(isExpanded)}
      isExpanded={isExpanded}
      {...props}
    >
      {children}
    </ExpandableSection>
  );
};

export default DashboardExpandableSection;
