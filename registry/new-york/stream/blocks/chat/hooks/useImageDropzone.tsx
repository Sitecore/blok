import { useCallback, useMemo } from "react"
import {
  useDropzone,
  type DropzoneInputProps,
  type DropzoneRootProps,
} from "react-dropzone"
import { toast } from "sonner"

type UseImageDropzoneOptions = {
  enabled: boolean
  currentCount: number
  maxTotal?: number // default 10
  maxSizeBytes?: number // default 5MB
  onFilesAccepted?: (files: File[]) => void
}

type UseImageDropzoneResult = {
  getRootProps: () => DropzoneRootProps
  getInputProps: () => DropzoneInputProps
  isDragActive: boolean
  open: () => void
  remainingSlots: number
}

export function useImageDropzone(
  options: UseImageDropzoneOptions
): UseImageDropzoneResult {
  const {
    enabled,
    currentCount,
    maxTotal = 10,
    maxSizeBytes = 5 * 1024 * 1024,
    onFilesAccepted,
  } = options

  const remainingSlots = useMemo(
    () => Math.max(0, maxTotal - (currentCount || 0)),
    [currentCount, maxTotal]
  )

  const fileValidator = useCallback(() => {
    if (!enabled) return null
    if (remainingSlots === 0) {
      return {
        code: "too-many-files",
        message: `You can only upload up to ${maxTotal} files.`,
      } as any
    }
    return null
  }, [enabled, remainingSlots, maxTotal])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles?.length) return
      const addCount = Math.max(0, remainingSlots)
      const filesToAdd = acceptedFiles.slice(0, addCount)
      if (filesToAdd.length) {
        onFilesAccepted?.(filesToAdd)
      }
      if (acceptedFiles.length > filesToAdd.length) {
        toast.error(`You can only upload up to ${maxTotal} files.`)
      }
    },
    [onFilesAccepted, remainingSlots, maxTotal]
  )

  const onDropRejected = useCallback(
    (rejectedFiles: any[]) => {
      const hasTooManyFilesError = rejectedFiles.some((f) =>
        f.errors.some((e: any) => e.code === "too-many-files")
      )
      const hasFileSizeError = rejectedFiles.some((f) =>
        f.errors.some((e: any) => e.code === "file-too-large")
      )
      const hasFileTypeError = rejectedFiles.some((f) =>
        f.errors.some((e: any) => e.code === "file-invalid-type")
      )

      if (hasTooManyFilesError) {
        toast.error(`You can only upload up to ${maxTotal} files.`)
      }
      if (hasFileSizeError) {
        toast.error("You can only upload files up to 5MB each.")
      }
      if (hasFileTypeError) {
        toast.error("You can only upload JPG and PNG files.")
      }
    },
    [maxTotal]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone(
    enabled
      ? {
          noClick: true,
          noKeyboard: true,
          multiple: true,
          accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          },
          maxSize: maxSizeBytes,
          // Avoid 0 = unlimited; leave validator to handle 0-slot case.
          maxFiles: Math.max(1, remainingSlots),
          validator: fileValidator,
          onDrop,
          onDropRejected,
        }
      : ({ disabled: true } as any)
  )

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    remainingSlots,
  }
}
