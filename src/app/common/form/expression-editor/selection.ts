export class EditorSelection {

  private $container;
  private currentSelection;
  private startOffset;
  private currentOffset;

  constructor($container) {
    this.$container = $container;
  }

  getCurrentOffset() {
    return this.currentOffset;
  }

  saveCurrentSelection() {
    try {
      this.$container.focus();
      this.currentSelection = this.getSelection();
      this.startOffset = this.currentSelection.startOffset;
      this.currentOffset = this.sumCurrentOffset(
        this.$container,
        this.currentSelection.startContainer,
        this.startOffset
      );
    } catch (ex) {
      this.currentOffset = this.$container.innerText.length;
    }
  }

  restoreSelection() {
    let node;
    if (this.currentOffset === 0) {
      return;
    }
    try {
      const range = document.createRange();
      ({ node, currentOffset: this.currentOffset } = this.findNodeForPosition(
        this.$container,
        this.currentOffset
      ));
      range.setStart(node, this.currentOffset);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (ex) {

    }
  }

  restoreSelectionPlus(n) {
    this.currentOffset += n;
    this.restoreSelection();
  }

  private getSelection() {
    if (window.getSelection) {
      return window.getSelection().getRangeAt(0);
    } else if ((<any>document).selection) {
      return (<any>document).selection.createRange();
    }
  }

  private sumCurrentOffset(root, node, startOffset) {
    for (let ele of Array.from(root.childNodes)) {
      if (node === ele) {
        break;
      }
      if ((<any>ele).contains(node)) {
        const result = this.sumCurrentOffset(ele, node, 0);
        startOffset += result;
        break;
      } else {
        startOffset += (<any>ele).textContent.length;
      }
    }
    return startOffset;
  }

  private findNodeForPosition($container, currentOffset) {
    let node;
    ({ node, currentOffset } = this.findNode(
      $container.childNodes,
      currentOffset
    ));
    if (node.childNodes.length === 0) {
      return { node, currentOffset };
    } else {
      return this.findNodeForPosition(node, currentOffset);
    }
  }

  private findNode(childNodes, currentOffset) {
    for (let node of Array.from(childNodes)) {
      if (currentOffset - (<any>node).textContent.length <= 0) {
        return { node, currentOffset };
      } else {
        currentOffset -= (<any>node).textContent.length;
      }
    }
  }
}