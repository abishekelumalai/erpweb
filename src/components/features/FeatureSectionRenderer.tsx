import type { FeatureSection } from '@/data/feature-pages';
import ProblemsGrid from './ProblemsGrid';
import TextSection from './TextSection';
import BenefitsGrid from './BenefitsGrid';
import WorkflowSteps from './WorkflowSteps';
import TabsPanel from './TabsPanel';
import TableSection from './TableSection';
import ConnectedSection from './ConnectedSection';

export default function FeatureSectionRenderer({ section }: { section: FeatureSection }) {
  switch (section.kind) {
    case 'problems':
      return <ProblemsGrid data={section} />;
    case 'text':
      return <TextSection data={section} />;
    case 'benefits':
      return <BenefitsGrid data={section} />;
    case 'workflow':
      return <WorkflowSteps data={section} />;
    case 'tabs':
      return <TabsPanel data={section} />;
    case 'table':
      return <TableSection data={section} />;
    case 'connected':
      return <ConnectedSection data={section} />;
    default:
      return null;
  }
}
