const scanPage = async ({ page }) => {
  return await page.evaluate(() => {
    if (typeof CSS === 'undefined' || typeof CSS.escape !== 'function') {
      window.CSS = {
        escape: function (value) {
          return value.replace(/([\0-\x1F\x7F-\x9F!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
        }
      };
    }

    const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL', 'FORM'];
    const elements = Array.from(document.querySelectorAll('*')).filter(el => interactiveTags.includes(el.tagName));
    const totalCount = elements.length;

    const issues = elements.map(el => {
      const id = el.id || null;
      const isUnique = id ? document.querySelectorAll(`#${CSS.escape(id)}`).length === 1 : false;
      const hasUsefulAttr = el.hasAttribute('data-testid') || el.hasAttribute('aria-label');

      let issueType = '✅ OK';
      if (!id && !hasUsefulAttr) issueType = '❌ Missing ID or data attribute';
      else if (id && !isUnique) issueType = '⚠️ Duplicate ID';

      const selectorSuggestion =
        id ? `#${CSS.escape(id)}` :
        el.getAttribute('data-testid') ? `[data-testid='${el.getAttribute('data-testid')}']` :
        el.className ? `${el.tagName.toLowerCase()}.${el.className.split(' ').map(c => CSS.escape(c)).join('.')}` :
        `${el.tagName.toLowerCase()}`;

      return {
        tag: el.tagName,
        id,
        class: el.className || null,
        text: el.innerText?.slice(0, 50) || '',
        issueType,
        suggestion: selectorSuggestion
      };
    });

    const failing = issues.filter(el => el.issueType !== '✅ OK');
    const passingCount = totalCount - failing.length;
    const score = totalCount > 0 ? Math.round((passingCount / totalCount) * 100) : 100;

    return { issues: failing, score };
  });
};

module.exports = { scanPage };