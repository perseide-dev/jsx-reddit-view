import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Box,
  TextField,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Pagination,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
  Fade,
  Button
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import LaunchIcon from '@mui/icons-material/Launch'   
import { useReddit } from '@cu/hooks/useReddit'

export default function PostDashboard() {
  const { getPosts, response, loading, error } = useReddit()
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  // Debounce búsqueda
  useEffect(() => {
    const id = setTimeout(() => {
      setPage(1)
      setDebouncedQ(q.trim())
    }, 450)
    return () => clearTimeout(id)
  }, [q])

  const total = response?.count || 0
  const rows = response?.rows || []
  const totalPages = useMemo(
    () => (total && limit ? Math.max(1, Math.ceil(total / limit)) : 1),
    [total, limit]
  )

  const fetchData = useCallback(() => {
    getPosts({
      page,
      limit,
      ...(debouncedQ ? { q: debouncedQ } : {})
    })
  }, [page, limit, debouncedQ, getPosts])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePageChange = (_e, value) => {
    setPage(value)
  }

  const truncate = (str, max = 180) =>
    !str
      ? ''
      : str.length <= max
        ? str
        : str.slice(0, max).replace(/\s+\S*$/, '') + '…'

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '.5px' }}>
            Subreddits
          </Typography>
          <Typography variant="body2" sx={{ opacity: .7 }}>
            Explora y filtra resultados por nombre o título.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            placeholder="Buscar (q)..."
            value={q}
            onChange={e => setQ(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" style={{ marginRight: 6, opacity: .6 }} />
            }}
            sx={{ minWidth: { xs: '100%', sm: 260 } }}
          />
          <Tooltip title="Recargar">
            <span>
              <IconButton onClick={fetchData} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3, opacity: .1 }} />

      {/* Estado de carga */}
      {loading && !rows.length && (
        <Box sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={42} />
          <Typography variant="body2" sx={{ opacity: .7 }}>Cargando resultados…</Typography>
        </Box>
      )}

      {/* Error */}
      {error && !loading && (
        <Fade in>
          <Box sx={{
            p: 4,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg,#1a1e25,#14171c)'
          }}>
            <Typography color="error" fontWeight={600} mb={1}>
              {error}
            </Typography>
            <Button variant="outlined" size="small" onClick={fetchData}>
              Reintentar
            </Button>
          </Box>
        </Fade>
      )}

      {/* Vacío */}
      {!loading && !error && rows.length === 0 && (
        <Box sx={{ py: 10, textAlign: 'center', opacity: .7 }}>
          <Typography>No hay resultados para: <strong>{debouncedQ || '—'}</strong></Typography>
        </Box>
      )}

      {/* Grid de resultados */}
      <Stack spacing={2}>
                {rows.map(row => (
          <Card
            key={row.id}
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'linear-gradient(145deg,#14171c,#101317)',
              '&:hover': { borderColor: 'secondary.main', transform: 'translateY(-2px)' },
              transition: 'all .25s'
            }}
          >
            <CardContent sx={{ pb: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" mb={1}>
                <Typography variant="h6" fontWeight={600} sx={{ letterSpacing: '.3px' }}>
                  {row.title || row.name}
                </Typography>
                <Chip
                  size="small"
                  label={row.name}
                  color="secondary"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{ opacity: .75, lineHeight: 1.4, whiteSpace: 'pre-line' }}
              >
                {truncate(row.description)}
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 2, pb: 1.5, gap: 2, flexWrap: 'wrap' }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" sx={{ opacity: .5 }}>
                  ID: {row.id}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: .65, fontFamily: 'mono', letterSpacing: '.5px' }}
                >
                  {row.url}
                </Typography>
              </Stack>

              <Button
                variant="outlined"
                size="small"
                color="secondary"
                href={`https://www.reddit.com${row?.url?.startsWith('/') ? row.url : `/${row.url || ''}`}`}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon fontSize="inherit" />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: '.3px',
                  backdropFilter: 'blur(4px)'
                }}
              >
                Abrir
              </Button>
            </Stack>
          </Card>
        ))}
      </Stack>

      {/* Paginación */}
      {rows.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            shape="rounded"
            size="medium"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Box>
  )
}