import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Resultado.module.css';
import Estatistica from '../components/Estatistica';
import Botao from '../components/Botao';

export default function Resultado() {
    const router = useRouter();
    const [total, setTotal] = useState(0);
    const [certas, setCertas] = useState(0);

    useEffect(() => {
        if (router.query.total && router.query.certas) {
            setTotal(Number(router.query.total));
            setCertas(Number(router.query.certas));
        }
    }, [router.query]);

    const percentual = total > 0 ? Math.round((certas / total) * 100) : 0;

    if (!router.query.total || !router.query.certas) {
        return <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            height: "100vh",
            width: "100vw"
        }}>Carregando...</div>;
    }

    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display: "flex" }}>
                <Estatistica texto="Perguntas" valor={total} />
                <Estatistica texto="Certas" valor={certas} corFundo="#9CD2A4" />
                <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo="#DE6A33" />
            </div>
            <Botao href="/" texto="Tentar Novamente" />
        </div>
    );
}
