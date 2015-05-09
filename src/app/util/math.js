/**
 * Random following normal distribution
 * @param  {float} mean mean
 * @param  {float} sd   standard deviation
 * @return {float}
 * @todo  rename sd to var      
 */
export function randn(mean, sd) {

	//Retrieved from jStat
	let u, v, x, y, q, mat;

	do {
		u = Math.random();
		v = 1.7156 * (Math.random() - 0.5);
		x = u - 0.449871;
		y = Math.abs(v) + 0.386595;
		q = x * x + y * (0.19600 * y - 0.25472 * x);
	} while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));

	return (v/u) * sd + mean;
}

/**
 * Compute the log with a given base
 *
 * Used primarily as log10 is not implemented yet on mobile browsers
 * 
 * @param  {int}
 * @param  {int}
 * @return {float}
 */
export function log(x, base) {
	return Math.log(x) / Math.log(base);
}

/**
 * Calculates two eigenvalues and eigenvectors from a 2x2 covariance matrix
 * @param  {Array} cov
 * @return {object}
 */
export function eigenvv(cov) {

	var a = cov[0][0];
	var b = cov[0][1];
	var c = cov[1][0];
	var d = cov[1][1];

	var A = 1;
	var B = - (a + d);
	var C = (a*d) - (c*b);

	var L1 = (-B + Math.sqrt((Math.pow(a - d, 2) + (4 * c * d))) / 2 * A);
	var L2 = (-B - Math.sqrt((Math.pow(a - d, 2) + (4 * c * d))) / 2 * A);

	var y1 = (L1 - a) / b;
	var y2 = (L2 - a) / b;
	var mag1 = Math.sqrt(1 + (y1 * y1));
	var mag2 = Math.sqrt(1 + (y2 * y2));

	return {
		values: [L1, L2], 
		vectors: [[1 / mag1, y1 / mag1], [1/mag2, y2/mag2]]
	};
}