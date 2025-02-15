import * as React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateFooter,
} from '@patternfly/react-core';
import WrenchIcon from '@patternfly/react-icons/dist/esm/icons/wrench-icon';
import { useNavigate } from 'react-router-dom';
import NewProjectButton from '~/pages/projects/screens/projects/NewProjectButton';

const PipelineCoreNoProjects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <EmptyState>
      <EmptyStateHeader
        titleText="No data science projects"
        icon={<EmptyStateIcon icon={WrenchIcon} />}
        headingLevel="h4"
      />
      <EmptyStateBody>
        To create a pipeline server and import a pipeline, first create a data science project.
      </EmptyStateBody>
      <EmptyStateFooter>
        <NewProjectButton
          closeOnCreate
          onProjectCreated={(projectName) => navigate(`/pipelines/${projectName}`)}
        />
      </EmptyStateFooter>
    </EmptyState>
  );
};

export default PipelineCoreNoProjects;
