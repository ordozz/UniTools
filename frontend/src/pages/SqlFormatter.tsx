import { FormatterCard } from '../components/FormatterCard';

export const SqlFormatter: React.FC = () => (
  <FormatterCard
    type="sql"
    title="SQL Formatter (MS SQL)"
    description="Strictly validates T-SQL / MS SQL syntax using sqlglot. Shows exact line and column of errors."
  />
);
