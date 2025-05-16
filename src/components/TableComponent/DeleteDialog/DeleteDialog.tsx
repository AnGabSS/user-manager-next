import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { DialogFooter, DialogHeader } from "../../ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteDialog = ({ open, onOpenChange, onConfirm }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-emerald-400/95 text-white shadow-xl rounded-lg">
        <DialogHeader className="bg-emerald-600 text-white p-4 rounded-t-lg outline outline-1 outline-emerald-800/70">
          <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 w-full flex justify-around sm:justify-around gap-4 px-6 pb-4">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Não
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
