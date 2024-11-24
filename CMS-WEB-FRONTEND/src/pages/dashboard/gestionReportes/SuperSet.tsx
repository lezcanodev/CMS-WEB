const iframeUrl = `http://127.0.0.1:8088/superset/dashboard/p/R7xpLgENW0o/`;
export const SupersetEmbed = () => (
    <iframe
    width="1200"
    height="600"
    seamless
    src={iframeUrl}>
    </iframe>
  );
