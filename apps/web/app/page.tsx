import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { CheckCircle2Icon } from "lucide-react"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Apps/web directory</AlertTitle>
        </Alert>
      </div>
    </div>
  )
}
