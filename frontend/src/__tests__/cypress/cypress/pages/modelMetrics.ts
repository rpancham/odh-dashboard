import { Contextual } from './components/Contextual';
import { Modal } from './components/Modal';
import { TableRow } from './components/table';

class ModelMetricsGlobal {
  findMetricsToolbarTimeRangeSelect() {
    return cy.findByTestId('metrics-toolbar-time-range-select');
  }

  findMetricsToolbarRefreshIntervalSelect() {
    return cy.findByTestId('metrics-toolbar-refresh-interval-select');
  }

  getMetricsChart(title: string) {
    return new ModelMetricsChart(() => cy.findByTestId(`metrics-card-${title}`).parents());
  }
}

class ModelMetricsChart extends Contextual<HTMLTableRowElement> {
  shouldHaveNoData() {
    this.find().findByTestId('metrics-chart-no-data');
  }

  shouldHaveData() {
    this.find().findByTestId('metrics-chart-has-data');
  }
}

class ModelMetricsPerformance extends ModelMetricsGlobal {
  visit(project: string, model: string) {
    cy.visitWithLogin(`/modelServing/${project}/metrics/${model}/performance`);
    this.wait();
  }

  private wait() {
    cy.findByTestId('performance-metrics-loaded');
    cy.testA11y();
  }

  findTab() {
    return cy.findByTestId('performance-tab');
  }
}

class ModelMetricsBias extends ModelMetricsGlobal {
  visit(project: string, model: string, disableA11y = false) {
    cy.visitWithLogin(`/modelServing/${project}/metrics/${model}/bias`);

    // TODO: disableA11y should be removed once this PF bug is resolved: https://github.com/patternfly/patternfly-react/issues/9968
    this.wait(disableA11y);
  }

  private wait(disableA11y: boolean) {
    cy.findByTestId('bias-metrics-loaded');
    if (!disableA11y) {
      cy.testA11y();
    }
  }

  getMetricsChart(modelTitle: string, sectionTitle?: string) {
    if (!sectionTitle) {
      return super.getMetricsChart(modelTitle);
    }

    return new ModelMetricsChart(() =>
      cy
        .findByTestId(`expandable-section-${sectionTitle}`)
        .findByTestId(`metrics-card-${modelTitle}`)
        .parents(),
    );
  }

  findTab() {
    return cy.findByTestId('bias-tab');
  }

  findConfigSelector() {
    return cy.get('#bias-metric-config-selector');
  }

  shouldNotBeConfigured() {
    cy.findByTestId('bias-metrics-empty-state').should('exist');
  }
}

class ServerMetrics extends ModelMetricsGlobal {
  visit(project: string, server: string) {
    cy.visitWithLogin(`/projects/${project}/metrics/server/${server}`);
    this.wait();
  }

  private wait() {
    cy.findByTestId('server-metrics-loaded');
    cy.testA11y();
  }
}

class ModelMetricsConfigureSection {
  visit(project: string, model: string) {
    cy.visitWithLogin(`/modelServing/${project}/metrics/${model}/configure`);
    this.wait();
  }

  private wait() {
    this.findTable();
    cy.testA11y();
  }

  private findTable() {
    return cy.findByTestId('metrics-configure-table-loaded');
  }

  getMetricRow(name: string) {
    return new MetricRow(() =>
      this.findTable().find('[data-label=Name]').contains(name).parents('tr'),
    );
  }

  findConfigureMetricButton() {
    return cy.findByRole('button', { name: 'Configure metric' });
  }
}

class MetricRow extends TableRow {
  findExpandButton() {
    return this.find().findByTestId('bias-configuration-expand-cell');
  }

  findExpansion() {
    return this.find().siblings();
  }
}
class ConfigureBiasMetricModal extends Modal {
  constructor() {
    super('Configure bias metric');
  }

  findSubmitButton() {
    return this.findFooter().findByRole('button', { name: 'Configure' });
  }

  findMetricNameInput() {
    return this.find().find('#metric-name');
  }
  findProtectedAttributeInput() {
    return this.find().find('#protected-attribute');
  }
  findMetricTypeSelect() {
    return this.find().find('#metric-type');
  }
  findPrivilegedValueInput() {
    return this.find().find('#privileged-value');
  }
  findUnprivilegedValueInput() {
    return this.find().find('#unprivileged-value');
  }
  findOutputInput() {
    return this.find().find('#output');
  }
  findOutputValueInput() {
    return this.find().find('#output-value');
  }
  findViolationThresholdInput() {
    return this.find().find('#violation-threshold');
  }
  findMetricBatchSizeInput() {
    return this.find().find('#metric-batch-size');
  }
}

export const modelMetricsPerformance = new ModelMetricsPerformance();
export const modelMetricsBias = new ModelMetricsBias();
export const serverMetrics = new ServerMetrics();
export const modelMetricsConfigureSection = new ModelMetricsConfigureSection();
export const configureBiasMetricModal = new ConfigureBiasMetricModal();
