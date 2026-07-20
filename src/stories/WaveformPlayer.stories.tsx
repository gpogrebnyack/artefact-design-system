import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import { WaveformPlayer, type WaveformPlayerHandle } from '@/components/composed/WaveformPlayer'
import { Flex, Surface, color } from '@/foundation'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/foundation'
import { TimeTag } from '@/components/composed/TimeTag'

/*
 * WaveformPlayer — dialog-v2's `.audio`: the page's central instrument.
 * Moment bands wash the wave with the verdict tone; the whole page drives
 * it through the ref handle (seek / highlightMark) — here a TimeTag below
 * the panel plays the loyalty-card moment, the source's own wiring.
 */
const meta: Meta<typeof WaveformPlayer> = {
  title: 'Components/WaveformPlayer',
  component: WaveformPlayer,
}
export default meta
type Story = StoryObj<typeof WaveformPlayer>

const MARKS = [
  { id: 0, start: 0, end: 1, tone: 'accent' as const },
  { id: 2, start: 5, end: 8, tone: 'accent' as const },
  { id: 3, start: 15, end: 17, tone: 'success' as const },
  { id: 4, start: 21, end: 22, tone: 'success' as const },
]

function Demo() {
  const ref = useRef<WaveformPlayerHandle>(null)
  return (
    <div style={{ maxWidth: 840 }}>
      <Surface variant="panel" radius="xl" style={{ padding: 20 }}>
        <WaveformPlayer
          ref={ref}
          duration={22}
          marks={MARKS}
          actions={
            <>
              <Icon name="transcript" size={20} label="Транскрипт" />
              <Text as="span" size="caption" color={color.mutedForeground}>Скорость: 1×</Text>
              <Icon name="volume" size={20} label="Громкость" />
            </>
          }
        />
      </Surface>
      <Flex gap="sm" align="center" style={{ marginTop: 16 }}>
        <Text as="span" size="caption" color={color.mutedForeground}>Момент «Карта лояльности»:</Text>
        <TimeTag time="00:15" tone="success" onClick={() => ref.current?.seek(15, { play: true })} />
      </Flex>
    </div>
  )
}

export const WithMoments: Story = {
  render: () => <Demo />,
}
