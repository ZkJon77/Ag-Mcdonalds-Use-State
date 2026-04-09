import { useState } from 'react'
import './App.css'

const lanches = [
  { id: 1, nome: 'Big Mac',    emoji: '🍔', preco: 24.90 },
  { id: 2, nome: 'McChicken',  emoji: '🐔', preco: 19.90 },
  { id: 3, nome: 'McBacon',    emoji: '🥓', preco: 26.90 },
  { id: 4, nome: 'Quarterão',  emoji: '🧀', preco: 22.90 },
]

const bebidas = [
  { id: 5, nome: 'Coca-Cola', emoji: '🥤', preco: 7.90 },
  { id: 6, nome: 'McShake',   emoji: '🥛', preco: 14.90 },
  { id: 7, nome: 'Suco',      emoji: '🍊', preco: 9.90 },
  { id: 8, nome: 'Água',      emoji: '💧', preco: 4.90 },
]

const cupons = [
  { code: 'MC30APR',    desconto: '30% OFF em qualquer combo' },
  { code: 'MC10MIN',    desconto: 'R$ 10 OFF acima de R$ 40' },
  { code: 'BATATAFREE', desconto: 'Batata grátis no combo'   },
]

function App() {
  // useStates de tipos diferentes
  const [categoria, setCategoria]         = useState('lanches') // String
  const [carrinho, setCarrinho]           = useState([])         // Array de Objetos
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)    // Boolean
  const [totalPedidos, setTotalPedidos]   = useState(0)          // Number

  const lista = categoria === 'lanches' ? lanches : bebidas

  function adicionar(item) {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === item.id)
      if (existe)
        return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...item, qtd: 1 }]
    })
  }

  function remover(id) {
    setCarrinho(prev => {
      const item = prev.find(i => i.id === id)
      if (item.qtd > 1)
        return prev.map(i => i.id === id ? { ...i, qtd: i.qtd - 1 } : i)
      return prev.filter(i => i.id !== id)
    })
  }

  const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0)
  const qtd   = carrinho.reduce((s, i) => s + i.qtd, 0)

  function finalizar() {
    if (!carrinho.length) return
    alert(`Pedido #${totalPedidos + 1} feito!\nTotal: R$ ${total.toFixed(2)}`)
    setTotalPedidos(n => n + 1)
    setCarrinho([])
    setCarrinhoAberto(false)
  }

  const categorias = [
    { id: 'lanches', label: 'Lanches', icon: '🍔' },
    { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
    { id: 'cupons',  label: 'Cupons',  icon: '🎟️' },
  ]

  return (
    <div className="app">

      {/* Cabeçalho */}
      <div className="header">
        <div className="logo">M</div>
        <div className="slogan">Amo muito tudo isso</div>
      </div>

      {/* Botões de categoria */}
      <div className="btns">
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={`cat-btn ${categoria === cat.id ? 'ativo' : ''}`}
            onClick={() => setCategoria(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="body">

        {/* Aba Cupons */}
        {categoria === 'cupons' && (
          <div>
            <h2 className="titulo">🎟️ Cupons</h2>
            {cupons.map(cu => (
              <div key={cu.code} className="cupom">
                <div>
                  <div className="cupom-desconto">{cu.desconto}</div>
                  <div className="cupom-code">{cu.code}</div>
                </div>
                <button
                  className="copiar-btn"
                  onClick={() => navigator.clipboard.writeText(cu.code)}
                >
                  Copiar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Aba Lanches ou Bebidas */}
        {categoria !== 'cupons' && (
          <div>
            <h2 className="titulo">
              {categoria === 'lanches' ? '🍔 Lanches' : '🥤 Bebidas'}
            </h2>

            <div className="grid">
              {lista.map(p => (
                <div key={p.id} className="card">
                  <span className="emoji">{p.emoji}</span>
                  <div className="nome">{p.nome}</div>
                  <div className="preco">R$ {p.preco.toFixed(2)}</div>
                  <button className="add-btn" onClick={() => adicionar(p)}>
                    + Adicionar
                  </button>
                </div>
              ))}
            </div>

            {/* Barra do carrinho */}
            <div
              className="carrinho-bar"
              onClick={() => setCarrinhoAberto(a => !a)}
            >
              <span>🛍 {qtd} {qtd === 1 ? 'item' : 'itens'}</span>
              <span className="carr-total">R$ {total.toFixed(2)}</span>
            </div>

            {/* Lista do carrinho */}
            {carrinhoAberto && (
              <div className="carr-lista">
                {carrinho.length === 0 ? (
                  <p className="vazio">Carrinho vazio</p>
                ) : (
                  <>
                    {carrinho.map(i => (
                      <div key={i.id} className="carr-item">
                        <span>{i.emoji} {i.nome} x{i.qtd}</span>
                        <span className="carr-item-direita">
                          <span className="carr-preco">
                            R$ {(i.preco * i.qtd).toFixed(2)}
                          </span>
                          <button
                            className="rem-btn"
                            onClick={() => remover(i.id)}
                          >
                            −
                          </button>
                        </span>
                      </div>
                    ))}
                    <button className="finalizar" onClick={finalizar}>
                      Fazer Pedido
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default App