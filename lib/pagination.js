// Pagination helper extracted for testing in a browser context.
function runPagination(doc = document, rootSelector = '.pdf-resume-root') {
  try {
    const mmToPx = (mm) => (mm * 96) / 25.4;
    // compute full height including margins
    const getFullHeight = (el) => {
      if (!el) return 0;
      try {
        const rect = el.getBoundingClientRect();
        const cs = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.getComputedStyle(el)) || window.getComputedStyle(el);
        const mt = parseFloat(cs.marginTop) || 0;
        const mb = parseFloat(cs.marginBottom) || 0;
        return rect.height + mt + mb;
      } catch (err) {
        return el.offsetHeight || 0;
      }
    };
    const pageHeightPx = mmToPx(297);
    console.log(`Pagination helper start: pageHeightPx=${pageHeightPx}`);

    const root = (doc || document).querySelector(rootSelector);
    if (!root) {
      console.log(`No root found for selector "${rootSelector}"`);
      return { totalH: 0, pages: 0 };
    }

    let currentY = 0;
    const children = Array.from(root.children || []);
    const sectionNodes = Array.from(root.querySelectorAll('.resume-section') || []);
    // prefer explicit .resume-section nodes if present (handles wrapper divs)
    const nodesToProcess = sectionNodes.length ? sectionNodes : children;
    console.log(`Found root with children count=${children.length} sectionsCount=${sectionNodes.length}`);

    // const allHeaders = Array.from(root.querySelectorAll('.resume-section-title') || []);
    // console.log(`Found resume headers count=${allHeaders.length}`);
    // allHeaders.forEach((hdr, idx) => {
    //   const rect = hdr.getBoundingClientRect();
    //   const hdrH = rect.height || hdr.offsetHeight || 0;
    //   const hdrText = hdr.textContent ? hdr.textContent.trim() : 'UNKNOWN';
    //   // compute cumulative height before this header's section by summing
    //   // heights of preceding siblings of its closest .resume-section ancestor
    //   let cumulativeBeforeHeader = 0;
    //   const sectionNode = hdr.closest('.resume-section');
    //   if (sectionNode && sectionNode.parentElement) {
    //     const siblings = Array.from(sectionNode.parentElement.children);
    //     for (const s of siblings) {
    //       if (s === sectionNode) break;
    //       const h = (s.getBoundingClientRect().height || s.offsetHeight || 0);
    //       cumulativeBeforeHeader += h;
    //     }
    //   } else {
    //     // fallback: use header's offset from root
    //     cumulativeBeforeHeader = hdr.getBoundingClientRect().top - root.getBoundingClientRect().top;
    //     if (Number.isNaN(cumulativeBeforeHeader)) cumulativeBeforeHeader = 0;
    //   }
    //   console.log(`Resume header: index=${idx} text="${hdrText}" height=${hdrH} cumulativeBefore=${Math.round(cumulativeBeforeHeader)}`);
    // });

    // for (const node of nodesToProcess) {
    //   const nodeH = getFullHeight(node);
    //   const cumulativeBeforeNode = currentY;
    //   console.log(`Inspecting node: tag=${node.tagName} class="${node.className}" nodeH=${nodeH} cumulativeBefore=${cumulativeBeforeNode}`);

    //   if ((currentY % pageHeightPx) + nodeH <= pageHeightPx) {
    //     currentY += nodeH;
    //     console.log(`Node fits current page, cumulativeAfter=${currentY} page=${Math.floor(currentY / pageHeightPx) + 1} offsetOnPage=${currentY % pageHeightPx}`);
    //     continue;
    //   }

    //   if (node.classList && node.classList.contains('resume-section')) {
    //     const header = node.querySelector('.resume-section-title');
    //     const headerH = header ? getFullHeight(header) : 0;
    //     const entries = Array.from(node.querySelectorAll('.resume-entry') || []);
    //     console.log(`Section detected: headerH=${headerH} entriesCount=${entries.length} headerText="${header ? (header.textContent || '').trim() : 'UNKNOWN'}"`);

    //     if ((currentY % pageHeightPx) + headerH > pageHeightPx) {
    //       console.log(`Header does not fit on current page, forcing page break before section: headerText="${header ? (header.textContent || '').trim() : 'UNKNOWN'}" headerH=${headerH} cumulativeBeforeHeader=${currentY}`);
    //       node.style.pageBreakBefore = 'always';
    //       currentY = headerH;
    //       console.log(`After header page break, cumulativeAfterHeader=${currentY} page=${Math.floor(currentY / pageHeightPx) + 1} offsetOnPage=${currentY % pageHeightPx}`);
    //     }

    //     let overflowSection = null;

    //     for (const entry of entries) {
    //       const entryIndex = entries.indexOf(entry);
    //       let h = getFullHeight(entry);
    //       // account for parent row-gap between entries if present
    //       try {
    //         const parent = entry.parentElement;
    //         if (parent) {
    //           const pcs = (parent.ownerDocument && parent.ownerDocument.defaultView && parent.ownerDocument.defaultView.getComputedStyle(parent)) || window.getComputedStyle(parent);
    //           const rowGap = parseFloat(pcs.rowGap || pcs.gap || pcs['row-gap']) || 0;
    //           if (entryIndex > 0) h += rowGap;
    //         }
    //       } catch (err) {
    //         /* ignore */
    //       }
    //       const sectionTitle = header ? (header.textContent || '').trim() : 'UNKNOWN';
    //       const titleEl = entry.querySelector('.font-bold');
    //       const entryTitle = titleEl ? (titleEl.textContent || '').trim() : (entry.textContent ? entry.textContent.trim() : 'UNKNOWN');
    //       const cumulativeBeforeEntry = currentY;
    //       // absolute cumulative relative to root (top of .pdf-resume-root)
    //       let absoluteCumulative = 0;
    //       try {
    //         const rootTop = root.getBoundingClientRect().top || 0;
    //         const entryTop = entry.getBoundingClientRect().top || 0;
    //         absoluteCumulative = Math.round(entryTop - rootTop);
    //       } catch (err) {
    //         absoluteCumulative = Math.round(cumulativeBeforeEntry);
    //       }
    //       console.log(`Checking entry: section="${sectionTitle}" index=${entryIndex} title="${entryTitle}" height=${h} availableOnPage=${pageHeightPx - (currentY % pageHeightPx)} cumulativeBefore=${cumulativeBeforeEntry} absoluteCumulative=${absoluteCumulative} pageBefore=${Math.floor(cumulativeBeforeEntry / pageHeightPx) + 1}`);

    //       if ((currentY % pageHeightPx) + h <= pageHeightPx) {
    //         currentY += h;
    //         console.log(`Entry fits, cumulativeAfterEntry=${currentY} pageAfter=${Math.floor(currentY / pageHeightPx) + 1} offsetOnPage=${currentY % pageHeightPx}`);
    //         continue;
    //       }

    //       console.log(`Predicted split -> section: "${sectionTitle}" startEntryIndex: ${entryIndex}`);

    //       if (!overflowSection) {
    //         console.log(`Creating overflow section for remaining entries starting at index ${entryIndex} cumulativeBeforeOverflow=${currentY}`);
    //         overflowSection = (doc || document).createElement('section');
    //         overflowSection.className = node.className || '';
    //         if (header) {
    //           const headerClone = header.cloneNode(true);
    //           overflowSection.appendChild(headerClone);
    //         }
    //         overflowSection.style.pageBreakBefore = 'always';
    //         node.insertAdjacentElement('afterend', overflowSection);
    //         // account for cloned header height at top of the new overflow section
    //         try {
    //           const clonedHeaderEl = overflowSection.querySelector('.resume-section-title');
    //           const headerCloneH = clonedHeaderEl ? getFullHeight(clonedHeaderEl) : 0;
    //           currentY = headerCloneH;
    //         } catch (err) {
    //           currentY = 0;
    //         }
    //         console.log(`Inserted overflow section and set currentY to ${currentY} pageAfterInsert=${Math.floor(currentY / pageHeightPx) + 1}`);
    //       }

    //       console.log(`Moving entry to overflow section index=${entryIndex} title="${entryTitle}" cumulativeBeforeMove=${currentY}`);
    //       overflowSection.appendChild(entry);
    //       currentY += h;
    //       console.log(`After moving, cumulativeAfterMove=${currentY} page=${Math.floor(currentY / pageHeightPx) + 1} offsetOnPage=${currentY % pageHeightPx}`);
    //     }
    //   } else {
    //     console.log('Non-section node does not fit, forcing page break before it');
    //     node.style.pageBreakBefore = 'always';
    //     currentY = nodeH;
    //     console.log(`After non-section page break, currentY set to ${currentY}`);
    //   }
    // }

    const totalH = root.scrollHeight || root.getBoundingClientRect().height || root.offsetHeight || 0;
    const pages = Math.max(1, Math.ceil(totalH / pageHeightPx));
    console.log(`PDF total height (px): ${totalH} pages: ${pages}`);
    return { totalH, pages };
  } catch (e) {
    console.log('Pagination injection failed: ' + String(e));
    return { totalH: 0, pages: 0 };
  }
}

// attach to window for script-injection usage
if (typeof window !== 'undefined') {
  window.__runPagination = runPagination;
}

// CommonJS export for Node/require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runPagination };
}

