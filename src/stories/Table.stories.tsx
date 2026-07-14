import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// A Component — assembled from Table primitives + Badge, not atomic.
const meta: Meta<typeof Table> = { title: 'Components/Table', component: Table }
export default meta
type Story = StoryObj<typeof Table>

const ROSTER = [
  { name: 'Татьяна Климова', address: 'Большевистская 35', score: '7,1', delta: '+0,3' },
  { name: 'Кирилл', address: 'Большевистская 35', score: '6,3', delta: '+0,2' },
  { name: 'Александра Шипилова', address: 'Советская 5', score: '5,0', delta: '−0,4' },
  { name: 'Максим Орлов', address: 'Димитрова 2', score: '6,0', delta: '+0,1' },
]

export const Default: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>Состав команды за неделю 17–23 июня</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Сотрудник</TableHead>
          <TableHead>Адрес</TableHead>
          <TableHead>Оценка</TableHead>
          <TableHead className="text-right">За неделю</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROSTER.map((r) => (
          <TableRow key={r.name}>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell className="text-muted-foreground">{r.address}</TableCell>
            <TableCell>
              <Badge variant={Number(r.score.replace(',', '.')) < 5.5 ? 'destructive' : 'secondary'}>
                {r.score}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">{r.delta}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
