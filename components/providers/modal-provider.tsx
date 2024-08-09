import { AvatarBatchGenerateModal } from '../modals/avatar-batch-generate-modal'
import { CodeModal } from '../modals/code-modal'

export const ModalProvider = () => {
  return (
    <>
      <CodeModal />
      <AvatarBatchGenerateModal />
    </>
  )
}
