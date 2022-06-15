import { Empty } from 'antd'

type Props = {
    description: string
}

function EmptyComponent({description}: Props) {
  return (
    <Empty description={description} />
  )
}

export default EmptyComponent