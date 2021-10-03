import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import SVGCheck from "../components/icons/SVGCheck";
import { toast } from "react-toastify";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState("");
  const [resolveLoading, setResolveLoading] = useState("");

  useEffect(async () => {
    await fetchReports();
  }, []);

  const fetchReports = async () => {
    let reports = [];
    try {
      setReportsLoading(true);
      const reports_ = await fetch("/api/reports", {
        method: "get",
      });
      reports = await reports_.json();
      setReports(reports.data);
      setReportsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const resolve = (id) => async (e) => {
    e.preventDefault();

    try {
      setResolveLoading(id);
      const result = await fetch("/api/reports/resolve", {
        method: "put",
        body: JSON.stringify({ id }),
      });

      const response = await result.json();
      if (response.status === "Ok") {
        toast.success(
          <div>
            <h3>Success</h3>
            {response.message}
          </div>
        );
        setResolveLoading("");
        await fetchReports();
      }
    } catch (error) {
      toast.error(
        <div>
          <h3>Error</h3> {error.message}
        </div>
      );
    }
  };

  const block = (id, resolved) => async (e) => {
    e.preventDefault();

    if (!resolved) {
      try {
        setBlockLoading(id);
        const result = await fetch("/api/reports/block", {
          method: "put",
          body: JSON.stringify({ id }),
        });

        const response = await result.json();
        if (response.status === "Ok") {
          toast.success(
            <div>
              <h3>Success</h3>
              {response.message}
            </div>
          );
          setBlockLoading("");
          await fetchReports();
        }
      } catch (error) {
        toast.error(
          <div>
            <h3>Error</h3> {error.message}
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>aaib Full-Stack Challenge</title>
        <meta name="description" content="aaib Spam reports Exemple" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Reports</h1>
        <div className={styles.table}>
          {reportsLoading ? (
            <div className="loader text-primary">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            reports.map((report, idx) => {
              return (
                <div className={styles.row} key={idx}>
                  <div className="row mb-2">
                    <div className="col-4">
                      <b>Id:</b> {report.id}
                    </div>
                    <div className="col-6">
                      <b>Type:</b> {report.payload.reportType}
                    </div>
                    <div className="col-2 text-end">
                      <button
                        onClick={block(report.id, report.resolved)}
                        className={styles.btn + " btn btn-danger"}
                        disabled={
                          report.resolved || blockLoading ? true : false
                        }
                      >
                        {blockLoading === report.id ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></div>
                        ) : (
                          "Block"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <b>State:</b> {report.state}
                    </div>
                    <div className="col-6">
                      <b>Message:</b>{" "}
                      {report.payload.message ?? "No message..."}
                    </div>
                    <div className="col-2 text-end">
                      {report.resolved ? (
                        <>
                          <SVGCheck />{" "}
                          <span className="text-success">Resolved</span>
                        </>
                      ) : (
                        <button
                          onClick={resolve(report.id)}
                          className={styles.btn + " btn btn-success"}
                          disabled={resolveLoading === report.id}
                        >
                          {resolveLoading === report.id ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            ></div>
                          ) : (
                            "Resolve"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <a href="#">Details</a>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="row">
          <div className="col-12 pe-4 text-end">{reports.length} rows</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://simplecode.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by SimpleCode
        </a>
      </footer>
    </div>
  );
}
