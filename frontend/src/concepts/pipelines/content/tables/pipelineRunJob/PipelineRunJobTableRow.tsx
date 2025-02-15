import * as React from 'react';
import { ActionsColumn, TableText, Td, Tr } from '@patternfly/react-table';
import { useNavigate } from 'react-router-dom';
import { PipelineRunJobKF } from '~/concepts/pipelines/kfTypes';
import { TableRowTitleDescription, CheckboxTd } from '~/components/table';
import {
  RunJobScheduled,
  RunJobStatus,
  RunJobTrigger,
  CoreResourceExperiment,
  CoreResourcePipeline,
} from '~/concepts/pipelines/content/tables/renderUtils';
import { usePipelinesAPI } from '~/concepts/pipelines/context';

type PipelineRunJobTableRowProps = {
  isChecked: boolean;
  onToggleCheck: () => void;
  onDelete: () => void;
  job: PipelineRunJobKF;
};

const PipelineRunJobTableRow: React.FC<PipelineRunJobTableRowProps> = ({
  isChecked,
  onToggleCheck,
  onDelete,
  job,
}) => {
  const navigate = useNavigate();
  const { namespace, api, refreshAllAPI } = usePipelinesAPI();

  return (
    <Tr>
      <CheckboxTd id={job.id} isChecked={isChecked} onToggle={onToggleCheck} />
      <Td>
        <TableText wrapModifier="truncate">
          <TableRowTitleDescription title={job.name} description={job.description} />
        </TableText>
      </Td>
      <Td>
        <CoreResourceExperiment resource={job} />
      </Td>
      <Td modifier="truncate">
        <CoreResourcePipeline resource={job} namespace={namespace} />
      </Td>
      <Td>
        <RunJobTrigger job={job} />
      </Td>
      <Td>
        <RunJobScheduled job={job} />
      </Td>
      <Td>
        <RunJobStatus
          job={job}
          onToggle={(checked) => api.updatePipelineRunJob({}, job.id, checked).then(refreshAllAPI)}
        />
      </Td>
      <Td isActionCell>
        <ActionsColumn
          items={[
            {
              title: 'Duplicate',
              onClick: () => {
                navigate(`/pipelineRuns/${namespace}/pipelineRun/cloneJob/${job.id}`);
              },
            },
            {
              isSeparator: true,
            },
            {
              title: 'Delete',
              onClick: () => {
                onDelete();
              },
            },
          ]}
        />
      </Td>
    </Tr>
  );
};

export default PipelineRunJobTableRow;
