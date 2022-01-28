import puppeteer from "puppeteer";
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // ALTERE PARA TRUE PARA NÃO ABRIR O NAVEGADOR
  const page = await browser.newPage();
  await page.goto(
    "https://buscacepinter.correios.com.br/app/endereco/index.php"
  );
  await page.type("#endereco", "06653-040"); // ALTERE O CEP AQUI
  await page.click("#btn_pesquisar");
  await page.waitForTimeout(100);
  const dados = await page.evaluate(() => {
    let dados;
    try {
      let tabela = document.getElementsByTagName("table")[0].rows;
      let linhas = [...tabela];
      let valor = linhas[1].getElementsByTagName("td");
      dados = {
        Logradouro_Nome: valor[0].innerText,
        Bairro_Distrito: valor[1].innerText,
        Localidade_UF: valor[2].innerText,
        CEP: valor[3].innerText,
      };
    } catch (e) {
      dados = "Não há dados a serem exibidos";
    } finally {
      return dados;
    }
  });
  browser.close;
  console.table(dados);
})();
